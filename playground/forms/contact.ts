// Rules shared by the form markup (rules={contactRules.email}) and the server (validateForm).
import {
  custom,
  defineRule,
  email,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  required,
} from '../../src/rules';

// Custom rules are registered next to the rules that use them, so importing this module
// registers them wherever the rules are used — in the page script and on the server.
defineRule('nip', (value) => {
  const digits = value.replace(/[\s-]/g, '');
  if (!/^\d{10}$/.test(digits)) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = weights.reduce(
    (total, weight, i) => total + weight * Number(digits[i]),
    0,
  );
  return sum % 11 === Number(digits[9]);
});

export const contactRules = {
  name: [required('Podaj imię'), minLength(2, 'Imię jest za krótkie')],
  email: [required('Podaj email'), email('Niepoprawny adres email')],
  postalCode: [pattern(/\d{2}-\d{3}/, 'Kod w formacie 00-000')],
  nip: [custom('nip', 'Niepoprawny NIP')],
  message: [
    required('Napisz wiadomość'),
    minLength(10, 'Co najmniej 10 znaków'),
    maxLength(500, 'Maksymalnie 500 znaków'),
  ],
  terms: [required('Zaakceptuj regulamin')],
  services: [required('Wybierz co najmniej jedną usługę')],
  country: [required('Wybierz kraj')],
  guests: [
    required('Podaj liczbę gości'),
    min(1, 'Co najmniej 1 osoba'),
    max(20, 'Maksymalnie 20 osób'),
  ],
};
