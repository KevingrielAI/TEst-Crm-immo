import { Property, Lead } from '../types';

export const getProperties = (): Property[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('properties');
  return data ? JSON.parse(data) : [];
};

export const saveProperty = (property: Property): void => {
  const properties = getProperties();
  const index = properties.findIndex(p => p.id === property.id);
  if (index >= 0) {
    properties[index] = property;
  } else {
    properties.push(property);
  }
  localStorage.setItem('properties', JSON.stringify(properties));
};

export const getPropertyBySlug = (slug: string): Property | null => {
  const properties = getProperties();
  return properties.find(p => p.slug === slug) || null;
};

export const deleteProperty = (id: string): void => {
  const properties = getProperties().filter(p => p.id !== id);
  localStorage.setItem('properties', JSON.stringify(properties));
};

export const incrementViewCount = (id: string): void => {
  const properties = getProperties();
  const prop = properties.find(p => p.id === id);
  if (prop) {
    prop.viewCount = (prop.viewCount || 0) + 1;
    localStorage.setItem('properties', JSON.stringify(properties));
  }
};

export const getLeads = (): Lead[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('leads');
  return data ? JSON.parse(data) : [];
};

export const saveLead = (lead: Lead): void => {
  const leads = getLeads();
  leads.push(lead);
  localStorage.setItem('leads', JSON.stringify(leads));
};

export const getLeadsByProperty = (propertyId: string): Lead[] => {
  return getLeads().filter(l => l.propertyId === propertyId);
};
