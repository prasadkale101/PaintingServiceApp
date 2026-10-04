import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// Home Component
const Home = () => {
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                // Fetch services
                const servicesResponse = await fetch('/api/services');
                if (!servicesResponse.ok) {
                    throw new Error('Failed to fetch services');
                }
                const servicesData = await servicesResponse.json();
                setServices(servicesData);
                // Fetch reviews
                const reviewsResponse = await fetch('/api/reviews');
                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData);
                setLoading(false);
            }
            catch (err) {
                console.error('Error fetching home data:', err);
                // Just set loading to false, don't try to set error state
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "home", children: [_jsxs("section", { className: "hero", children: [_jsx("h2", { children: "Welcome to Our Painting Services" }), _jsx("p", { children: "Professional painting solutions for your home and business needs." })] }), _jsxs("section", { className: "services-preview", children: [_jsx("h2", { children: "Our Services" }), _jsxs("div", { className: "services-grid", children: [_jsxs("div", { className: "service-card", children: [_jsx("h3", { children: "Loading..." }), _jsx("p", { children: "Please wait while we load our services." })] }), _jsxs("div", { className: "service-card", children: [_jsx("h3", { children: "Loading..." }), _jsx("p", { children: "Please wait while we load our services." })] }), _jsxs("div", { className: "service-card", children: [_jsx("h3", { children: "Loading..." }), _jsx("p", { children: "Please wait while we load our services." })] })] })] }), _jsxs("section", { className: "reviews-preview", children: [_jsx("h2", { children: "Customer Reviews" }), _jsxs("div", { className: "reviews-grid", children: [_jsxs("div", { className: "review-card", children: [_jsx("h4", { children: "Loading..." }), _jsx("div", { className: "rating", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("p", { children: "Please wait while we load customer reviews." })] }), _jsxs("div", { className: "review-card", children: [_jsx("h4", { children: "Loading..." }), _jsx("div", { className: "rating", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("p", { children: "Please wait while we load customer reviews." })] }), _jsxs("div", { className: "review-card", children: [_jsx("h4", { children: "Loading..." }), _jsx("div", { className: "rating", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("p", { children: "Please wait while we load customer reviews." })] })] })] })] }));
    }
    // Get top 3 services (or all if less than 3)
    const topServices = services.slice(0, 3);
    // Get top 3 reviews (or all if less than 3)
    const topReviews = reviews.slice(0, 3);
    return (_jsxs("div", { className: "home", children: [_jsxs("section", { className: "hero", children: [_jsx("h2", { children: "Welcome to Our Painting Services" }), _jsx("p", { children: "Professional painting solutions for your home and business needs." })] }), _jsxs("section", { className: "services-preview", children: [_jsx("h2", { children: "Our Services" }), _jsx("div", { className: "services-grid", children: topServices.map((service) => (_jsxs("div", { className: "service-card", children: [_jsx("h3", { children: service.name }), _jsx("p", { children: service.description }), _jsx("p", { className: "price", children: service.price })] }, service.id))) }), _jsx(Link, { to: "/services", className: "btn", children: "View All Services" })] }), _jsxs("section", { className: "reviews-preview", children: [_jsx("h2", { children: "Customer Reviews" }), _jsx("div", { className: "reviews-grid", children: topReviews.map((review) => (_jsxs("div", { className: "review-card", children: [_jsx("h4", { children: review.name }), _jsx("div", { className: "rating", children: '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) }), _jsx("p", { children: review.comment })] }, review.id))) }), _jsx(Link, { to: "/reviews", className: "btn", children: "View All Reviews" })] }), _jsxs("section", { className: "gallery-preview", children: [_jsx("h2", { children: "Photo Gallery" }), _jsxs("div", { className: "gallery-grid", children: [_jsxs("div", { className: "gallery-item", children: [_jsx("img", { src: "/images/painting-1.jpg", alt: "Living Room Transformation" }), _jsx("p", { children: "Living Room Transformation" })] }), _jsxs("div", { className: "gallery-item", children: [_jsx("img", { src: "/images/painting-2.jpg", alt: "Kitchen Renovation" }), _jsx("p", { children: "Kitchen Renovation" })] }), _jsxs("div", { className: "gallery-item", children: [_jsx("img", { src: "/images/painting-3.jpg", alt: "Exterior House Painting" }), _jsx("p", { children: "Exterior House Painting" })] })] }), _jsx(Link, { to: "/gallery", className: "btn", children: "View Gallery" })] })] }));
};
// Services Component
const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
                setLoading(false);
            }
            catch (err) {
                console.error('Error fetching services:', err);
                setLoading(false);
            }
        };
        fetchServices();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "services", children: [_jsx("h2", { children: "All Services" }), _jsx("p", { children: "Loading services..." })] }));
    }
    return (_jsxs("div", { className: "services", children: [_jsx("h2", { children: "All Services" }), _jsx("div", { className: "services-grid", children: services.map((service) => (_jsxs("div", { className: "service-card", children: [_jsx("h3", { children: service.name }), _jsx("p", { children: service.description }), _jsx("p", { className: "price", children: service.price })] }, service.id))) })] }));
};
// Reviews Component
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
                setLoading(false);
            }
            catch (err) {
                console.error('Error fetching reviews:', err);
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "reviews", children: [_jsx("h2", { children: "All Customer Reviews" }), _jsx("p", { children: "Loading reviews..." })] }));
    }
    return (_jsxs("div", { className: "reviews", children: [_jsx("h2", { children: "All Customer Reviews" }), _jsx("div", { className: "reviews-grid", children: reviews.map((review) => (_jsxs("div", { className: "review-card", children: [_jsx("h4", { children: review.name }), _jsx("div", { className: "rating", children: '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) }), _jsx("p", { children: review.comment })] }, review.id))) })] }));
};
// Gallery Component
const Gallery = () => {
    return (_jsxs("div", { className: "gallery", children: [_jsx("h2", { children: "Photo Gallery" }), _jsxs("div", { className: "gallery-grid", children: [_jsxs("div", { className: "gallery-item", children: [_jsx("img", { src: "/images/painting-1.jpg", alt: "Living Room Transformation" }), _jsx("p", { children: "Living Room Transformation" })] }), _jsxs("div", { className: "gallery-item", children: [_jsx("img", { src: "/images/painting-2.jpg", alt: "Kitchen Renovation" }), _jsx("p", { children: "Kitchen Renovation" })] }), _jsxs("div", { className: "gallery-item", children: [_jsx("img", { src: "/images/painting-3.jpg", alt: "Exterior House Painting" }), _jsx("p", { children: "Exterior House Painting" })] })] })] }));
};
// Schedule Component
const Schedule = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        date: '',
        time: '',
        location: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        try {
            const response = await fetch('/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to schedule service');
            }
            setSubmitSuccess(true);
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                serviceType: '',
                date: '',
                time: '',
                location: '',
                description: ''
            });
        }
        catch (err) {
            console.error('Error scheduling service:', err);
            setSubmitError('Failed to schedule service. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "schedule", children: [_jsx("h2", { children: "Schedule Service" }), submitSuccess ? (_jsxs("div", { className: "success-message", children: [_jsx("p", { children: "Thank you! Your service request has been submitted successfully." }), _jsx("p", { children: "We will contact you shortly to confirm your appointment." })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "schedule-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Full Name *" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email *" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "phone", children: "Phone Number *" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "serviceType", children: "Service Type *" }), _jsxs("select", { id: "serviceType", name: "serviceType", value: formData.serviceType, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select a service" }), _jsx("option", { value: "Interior Painting", children: "Interior Painting" }), _jsx("option", { value: "Exterior Painting", children: "Exterior Painting" }), _jsx("option", { value: "Ceiling Painting", children: "Ceiling Painting" }), _jsx("option", { value: "Trim and Doors", children: "Trim and Doors" }), _jsx("option", { value: "Wall Repairs", children: "Wall Repairs" }), _jsx("option", { value: "Other", children: "Other" })] })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "date", children: "Preferred Date *" }), _jsx("input", { type: "date", id: "date", name: "date", value: formData.date, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "time", children: "Preferred Time *" }), _jsx("input", { type: "time", id: "time", name: "time", value: formData.time, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "location", children: "Location *" }), _jsx("input", { type: "text", id: "location", name: "location", value: formData.location, onChange: handleChange, placeholder: "Address or location details", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "description", children: "Project Description" }), _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleChange, rows: 4, placeholder: "Please describe your painting project..." })] }), submitError && _jsx("div", { className: "error-message", children: submitError }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "btn", children: isSubmitting ? 'Submitting...' : 'Request Service' })] }))] }));
};
// Contact Component
const Contact = () => {
    return (_jsxs("div", { className: "contact", children: [_jsx("h2", { children: "Contact Us" }), _jsx("p", { children: "Have questions? Get in touch with us!" }), _jsx("p", { children: "Email: bravofernandez036@gmail.com" }), _jsx("p", { children: "Phone: (615) 692-8283" })] }));
};
function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "App", children: [_jsxs("header", { className: "App-header", children: [_jsxs("div", { className: "header-content", children: [_jsx("img", { src: "/images/logo.jpg", alt: "Painting Services Logo", className: "logo" }), _jsx("h1", { children: "Painting Services" })] }), _jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: "/", children: "Home" }) }), _jsx("li", { children: _jsx(Link, { to: "/services", children: "Services" }) }), _jsx("li", { children: _jsx(Link, { to: "/reviews", children: "Reviews" }) }), _jsx("li", { children: _jsx(Link, { to: "/gallery", children: "Gallery" }) }), _jsx("li", { children: _jsx(Link, { to: "/schedule", children: "Schedule Service" }) }), _jsx("li", { children: _jsx(Link, { to: "/contact", children: "Contact" }) })] }) })] }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/services", element: _jsx(Services, {}) }), _jsx(Route, { path: "/reviews", element: _jsx(Reviews, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(Gallery, {}) }), _jsx(Route, { path: "/schedule", element: _jsx(Schedule, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) })] }) })] }) }));
}
export default App;
