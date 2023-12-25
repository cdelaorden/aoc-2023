export const reverse = (s: string) => s.split('').reverse().join('')

export const replace =
  (search: string | RegExp, forThat: string) => (input: string) =>
    input.replaceAll(search, forThat)
