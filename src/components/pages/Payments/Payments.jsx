/*import { useState } from 'react';
import { navigate } from 'react-router-dom';

function Payments() {
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formattedValue.replace(/\s/g, '');
            formattedValue = formattedValue.replace(/(.{4})/g, '$1 ').trim();
        }

        if (name === 'expiryDate' && value.length === 2 && formData.expiryDate.length === 1) {
            formattedValue += '/';
        }

        setFormData({
            ...formData,
            [name]: formattedValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.cardNumber && formData.expiryDate && formData.cvv) {
            setTimeout(() => {
                setPaymentStatus('Pago exitoso. ¡Gracias por comprar nuestro servicio premium!');
                // Redirigir a la página de perfil después de 2 segundos
                setTimeout(() => {
                    navigate('/perfil');
                }, 2000);
            }, 2000);
        } else {
            alert('Por favor complete todos los campos.');
        }
    };

    return (
        <div className="payments-container">
            <h2>Pago con Tarjeta</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Completo:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Número de Tarjeta :
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength="19" pattern="\d{4} \d{4} \d{4} \d{4}" required placeholder='0000 0000 0000 0000' />
                </label>
                <label>
                    Fecha de Vencimiento :
                    <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} maxLength="5" pattern="\d{2}\/\d{2}" placeholder="MM/YY" required />
                </label>
                <label>
                    CVV:
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} maxLength="3" pattern="\d{3,4}" required placeholder='CVV'/>
                </label>
                <button type="submit">Pagar</button>
            </form>
            {paymentStatus && <p>{paymentStatus}</p>}
            {/* Aquí puedes agregar el key frame */

//export default Payments;
