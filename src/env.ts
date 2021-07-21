const { ENV } = process.env;

export const isProduction = ENV === 'production';
