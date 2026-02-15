import { get, set } from 'idb-keyval';

const FORM_STORAGE_KEY = 'form-data';

export const saveFormToDB = async (formData) => {
  try {
    await set(FORM_STORAGE_KEY, formData);
  } catch (error) {
    console.error('Failed to save form to IndexedDB:', error);
  }
};

export const loadFormFromDB = async () => {
  try {
    return await get(FORM_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to load form from IndexedDB:', error);
    return null;
  }
};
