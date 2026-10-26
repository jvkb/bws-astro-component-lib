// Validation rules in the spirit of Vuetify's `rules`, but as plain objects instead of functions:
// they can be serialized into the page for the browser (see Form.astro) and reused on the server
// (validateForm), so both sides run the same checks with the same messages.
//
// Like in Vuetify, every rule except `required` passes on an empty value — an optional email field
// may be left blank, but if filled it must be a valid address.

export type Rule =
  | { type: 'required'; message: string }
  | { type: 'email'; message: string }
  | { type: 'minLength'; value: number; message: string }
  | { type: 'maxLength'; value: number; message: string }
  | { type: 'min'; value: number; message: string }
  | { type: 'max'; value: number; message: string }
  | { type: 'pattern'; value: string; flags: string; message: string }
  | { type: 'custom'; name: string; message: string };

export function required(message = 'This field is required'): Rule {
  return { type: 'required', message };
}

export function email(message = 'Enter a valid email address'): Rule {
  return { type: 'email', message };
}

export function minLength(
  value: number,
  message = `Enter at least ${value} characters`,
): Rule {
  return { type: 'minLength', value, message };
}

export function maxLength(
  value: number,
  message = `Enter at most ${value} characters`,
): Rule {
  return { type: 'maxLength', value, message };
}

export function min(
  value: number,
  message = `Must be at least ${value}`,
): Rule {
  return { type: 'min', value, message };
}

export function max(value: number, message = `Must be at most ${value}`): Rule {
  return { type: 'max', value, message };
}

/** The whole value must match (like the HTML `pattern` attribute), not just a part of it. */
export function pattern(regex: RegExp, message = 'Invalid format'): Rule {
  return { type: 'pattern', value: regex.source, flags: regex.flags, message };
}

/** A rule registered with defineRule — use it for checks the built-in rules don't cover. */
export function custom(name: string, message = 'Invalid value'): Rule {
  return { type: 'custom', name, message };
}

type Check = (value: string) => boolean;

const customRules = new Map<string, Check>();

/**
 * Registers a custom rule. Call it in a module that both the page (in a <script>) and the
 * server code import, so the rule exists on both sides.
 */
export function defineRule(name: string, check: Check) {
  customRules.set(name, check);
}

// Same check browsers use for <input type="email">.
const EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function passes(rule: Rule, value: string) {
  if (rule.type === 'required') return value.trim() !== '';
  if (value === '') return true;

  switch (rule.type) {
    case 'email': {
      return EMAIL.test(value);
    }
    case 'minLength': {
      return value.length >= rule.value;
    }
    case 'maxLength': {
      return value.length <= rule.value;
    }
    case 'min': {
      return Number(value) >= rule.value;
    }
    case 'max': {
      return Number(value) <= rule.value;
    }
    case 'pattern': {
      return new RegExp(`^(?:${rule.value})$`, rule.flags).test(value);
    }
    case 'custom': {
      const check = customRules.get(rule.name);
      if (!check) {
        console.warn(
          `[bws-astro-ui] Unknown rule "${rule.name}" — register it with defineRule().`,
        );
        return true;
      }
      return check(value);
    }
  }
}

/** Returns the message of the first rule that fails, or null when the value is valid. */
export function validate(value: string, rules: Rule[]): string | null {
  for (const rule of rules) {
    if (!passes(rule, value)) return rule.message;
  }
  return null;
}

export type FormErrors = Record<string, string>;

/**
 * Validates submitted data on the server against the same rules the fields use.
 * Pass the errors back to the fields' `error` prop to show them.
 */
export function validateForm(
  data: FormData | Record<string, unknown>,
  rules: Record<string, Rule[]>,
): { valid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  for (const [name, fieldRules] of Object.entries(rules)) {
    const raw = data instanceof FormData ? data.get(name) : data[name];
    const value =
      typeof raw === 'string'
        ? raw
        : typeof raw === 'number'
          ? String(raw)
          : '';
    const message = validate(value, fieldRules);
    if (message) errors[name] = message;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Native attributes for the rules, so validation still works (and screen readers know a field is
 * required) before the script loads or without JavaScript. Used by the input components.
 */
export function toInputAttributes(rules: Rule[]) {
  const attributes: Record<string, string | number | boolean> = {};
  for (const rule of rules) {
    switch (rule.type) {
      case 'required': {
        attributes.required = true;
        break;
      }
      case 'minLength': {
        attributes.minlength = rule.value;
        break;
      }
      case 'maxLength': {
        attributes.maxlength = rule.value;
        break;
      }
      case 'min': {
        attributes.min = rule.value;
        break;
      }
      case 'max': {
        attributes.max = rule.value;
        break;
      }
      case 'pattern': {
        // The HTML attribute has no flags, so a flagged regex is left to the script.
        if (!rule.flags) attributes.pattern = rule.value;
        break;
      }
    }
  }
  return attributes;
}
