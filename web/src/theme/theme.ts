export const lightTheme = {
  bg: '#F8F9FA', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6C757D',
  primary: '#4361EE', primaryLight: '#E8EDFF', success: '#2DC653', warning: '#F4A261',
  danger: '#E63946', border: '#DEE2E6', accent: '#7209B7', boss: '#FF6B35',
  streak: '#FFD166', quiz: '#06D6A0',
};

export const darkTheme = {
  bg: '#0D1117', card: '#161B22', text: '#E6EDF3', textSecondary: '#8B949E',
  primary: '#58A6FF', primaryLight: '#1C2D41', success: '#3FB950', warning: '#D29922',
  danger: '#F85149', border: '#30363D', accent: '#BC8CFF', boss: '#FF7B54',
  streak: '#F0C040', quiz: '#39D98A',
};

export type Theme = typeof lightTheme;
