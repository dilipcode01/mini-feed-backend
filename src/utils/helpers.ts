export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const sanitizeContent = (content: string): string => {
  return content.trim().replace(/\s+/g, ' ');
};
