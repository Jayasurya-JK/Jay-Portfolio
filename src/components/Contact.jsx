import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        email: '',
        whatsapp: '',
        projectType: 'Website',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thanks for reaching out! I will get back to you shortly.');
    };

    return (
        <section id="contact" className="py-12 md:py-20 bg-secondary/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let’s build your online presence</h2>
                    <p className="text-gray-400">
                        Tell me a bit about your business. I’ll reply with ideas and a simple plan.
                    </p>
                </div>

                <div className="bg-secondary p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">Business Name (Optional)</label>
                                <input
                                    type="text"
                                    id="businessName"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="Your business"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number</label>
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">Type of Project</label>
                            <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                            >
                                <option value="Website">Website</option>
                                <option value="Product catalog">Product catalog</option>
                                <option value="Both">Both</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message / Requirements</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-primary border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-accent hover:bg-yellow-500 text-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Send Message <Send size={18} />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                        <p className="text-gray-400 mb-4">Prefer WhatsApp? Click below to chat.</p>
                        <a
                            href="https://wa.me/your-number"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-success hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20"
                        >
                            <MessageCircle size={20} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
