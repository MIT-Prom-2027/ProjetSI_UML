import { DocumentUpload } from "./types";

export const post = async <T>(url: string, data: object): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the POST operation:', error);
    throw error; // Relancer l'erreur pour permettre à l'appelant de la gérer
  }
};

export const post_mult = async <T>(url: string, data: object, files?: Record<string, File>|DocumentUpload): Promise<T> => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
    });

    if (files) {
      Object.entries(files).forEach(([key, file]) => {
        formData.append(key, file);
      });
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('There was a problem with the POST operation:', error);
    throw error;
  }
};