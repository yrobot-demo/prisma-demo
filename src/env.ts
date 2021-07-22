const { ENV, PORT = 4000 } = process.env;

export const isProduction = ENV === 'production';
export const port = PORT;
