import React, { useState } from 'react';

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'location',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'location',
        message: '',
      });
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {submitted && (
        <div
          className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md"
          role="alert"
        >
          <p className="font-medium">Message envoyé avec succès!</p>
          <p className="text-sm">Je vous recontacterai dans les plus brefs délais.</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-custom mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-custom focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-custom mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-custom focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-custom mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-custom focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-slate-custom mb-2">
          Type de projet *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-custom focus:border-transparent"
        >
          <option value="location">Location / Gestion locative</option>
          <option value="transaction">Transaction / Vente</option>
          <option value="autre">Autre demande</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-custom mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-custom focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
      >
        Envoyer ma demande
      </button>
    </form>
  );
};
