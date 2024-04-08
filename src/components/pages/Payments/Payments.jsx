import { useEffect, useState } from "react";
import "./_payments.scss";
import Loading from "../../utils/Loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Payments() {
  const countries = [
    { code: "AF", name: "Afganistán" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Argelia" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AI", name: "Anguila" },
    { code: "AQ", name: "Antártida" },
    { code: "AG", name: "Antigua y Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AW", name: "Aruba" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaiyán" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Baréin" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Bielorrusia" },
    { code: "BE", name: "Bélgica" },
    { code: "BZ", name: "Belice" },
    { code: "BJ", name: "Benín" },
    { code: "BM", name: "Bermudas" },
    { code: "BT", name: "Bután" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia y Herzegovina" },
    { code: "BW", name: "Botsuana" },
    { code: "BV", name: "Isla Bouvet" },
    { code: "BR", name: "Brasil" },
    { code: "BN", name: "Brunéi" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "KH", name: "Camboya" },
    { code: "CM", name: "Camerún" },
    { code: "CA", name: "Canadá" },
    { code: "CV", name: "Cabo Verde" },
    { code: "KY", name: "Islas Caimán" },
    { code: "CF", name: "República Centroafricana" },
    { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CX", name: "Isla de Navidad" },
    { code: "CC", name: "Islas Cocos" },
    { code: "CO", name: "Colombia" },
    { code: "KM", name: "Comoras" },
    { code: "CG", name: "República del Congo" },
    { code: "CD", name: "R.D. del Congo" },
    { code: "CK", name: "Islas Cook" },
    { code: "CR", name: "Costa Rica" },
    { code: "CI", name: "Costa de Marfil" },
    { code: "HR", name: "Croacia" },
    { code: "CU", name: "Cuba" },
    { code: "CY", name: "Chipre" },
    { code: "CZ", name: "República Checa" },
    { code: "DK", name: "Dinamarca" },
    { code: "DJ", name: "Yibuti" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "República Dominicana" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egipto" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Guinea Ecuatorial" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "ET", name: "Etiopía" },
    { code: "FK", name: "Islas Malvinas" },
    { code: "FO", name: "Islas Feroe" },
    { code: "FJ", name: "Fiyi" },
    { code: "FI", name: "Finlandia" },
    { code: "FR", name: "Francia" },
    { code: "GF", name: "Guayana Francesa" },
    { code: "PF", name: "Polinesia Francesa" },
    { code: "GA", name: "Gabón" },
    { code: "GM", name: "Gambia" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Alemania" },
    { code: "GH", name: "Ghana" },
    { code: "GI", name: "Gibraltar" },
    { code: "GR", name: "Grecia" },
    { code: "GL", name: "Groenlandia" },
    { code: "GD", name: "Granada" },
    { code: "GP", name: "Guadalupe" },
    { code: "GU", name: "Guam" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bisáu" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haití" },
    { code: "HM", name: "Islas Heard y McDonald" },
    { code: "VA", name: "Ciudad del Vaticano" },
    { code: "HN", name: "Honduras" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hungría" },
    { code: "IS", name: "Islandia" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia}" },
    { code: "IR", name: "Irán" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Irlanda" },
    { code: "IM", name: "Isla de Man" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italia" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japón" },
    { code: "JE", name: "Jersey" },
    { code: "JO", name: "Jordania" },
    { code: "KZ", name: "Kazajistán" },
    { code: "KE", name: "Kenia" },
    { code: "KI", name: "Kiribati" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kirguistán" },
    { code: "LA", name: "Laos" },
    { code: "LV", name: "Letonia" },
    { code: "LB", name: "Líbano" },
    { code: "LS", name: "Lesoto" },
    { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libia" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lituania" },
    { code: "LU", name: "Luxemburgo" },
    { code: "MO", name: "Macao" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malaui" },
    { code: "MY", name: "Malasia" },
    { code: "MV", name: "Maldivas" },
    { code: "ML", name: "Malí" },
    { code: "MT", name: "Malta" },
    { code: "MH", name: "Islas Marshall" },
    { code: "MQ", name: "Martinica" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauricio" },
    { code: "YT", name: "Mayotte" },
    { code: "MX", name: "México" },
    { code: "FM", name: "Micronesia" },
    { code: "MD", name: "Moldavia" },
    { code: "MC", name: "Mónaco" },
    { code: "MN", name: "Mongolia" },
    { code: "ME", name: "Montenegro" },
    { code: "MS", name: "Montserrat" },
    { code: "MA", name: "Marruecos" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Países Bajos" },
    { code: "NC", name: "Nueva Caledonia" },
    { code: "NZ", name: "Nueva Zelanda" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Níger" },
    { code: "NG", name: "Nigeria" },
    { code: "NU", name: "Niue" },
    { code: "NF", name: "Isla Norfolk" },
    { code: "KP", name: "Corea del Norte" },
    { code: "MK", name: "Macedonia del Norte" },
    { code: "NO", name: "Noruega" },
    { code: "OM", name: "Omán" },
    { code: "PK", name: "Pakistán" },
    { code: "PW", name: "Palaos" },
    { code: "PS", name: "Palestina" },
    { code: "PA", name: "Panamá" },
    { code: "PG", name: "Papúa Nueva Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Perú" },
    { code: "PH", name: "Filipinas" },
    { code: "PN", name: "Pitcairn" },
    { code: "PL", name: "Polonia" },
    { code: "PT", name: "Portugal" },
    { code: "PR", name: "Puerto Rico" },
    { code: "QA", name: "Catar" },
    { code: "RO", name: "Rumanía" },
    { code: "RU", name: "Rusia" },
    { code: "RW", name: "Ruanda" },
    { code: "RE", name: "Reunión" },
    { code: "BL", name: "San Bartolomé" },
    { code: "SH", name: "Santa Elena" },
    { code: "KN", name: "San Cristóbal y Nieves" },
    { code: "LC", name: "Santa Lucía" },
    { code: "MF", name: "San Martín" },
    { code: "PM", name: "San Pedro y Miquelón" },
    { code: "VC", name: "San Vicente y las Granadinas" },
    { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" },
    { code: "ST", name: "Santo Tomé y Príncipe" },
    { code: "SA", name: "Arabia Saudita" },
    { code: "SN", name: "Senegal" },
    { code: "RS", name: "Serbia" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leona" },
    { code: "SG", name: "Singapur" },
    { code: "SX", name: "Sint Maarten" },
    { code: "SK", name: "Eslovaquia" },
    { code: "SI", name: "Eslovenia" },
    { code: "SB", name: "Islas Salomón" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "Sudáfrica" },
    { code: "KR", name: "Corea del Sur" },
    { code: "SS", name: "Sudán del Sur" },
    { code: "ES", name: "España" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudán" },
    { code: "SR", name: "Surinam" },
    { code: "SJ", name: "Svalbard y Jan Mayen" },
    { code: "SE", name: "Suecia" },
    { code: "CH", name: "Suiza" },
    { code: "SY", name: "Siria" },
    { code: "TW", name: "Taiwán" },
    { code: "TJ", name: "Tayikistán" },
    { code: "TZ", name: "Tanzania" },
    { code: "TH", name: "Tailandia" },
    { code: "TL", name: "Timor Oriental" },
    { code: "TG", name: "Togo" },
    { code: "TK", name: "Tokelau" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinidad y Tobago" },
    { code: "TN", name: "Túnez" },
    { code: "TR", name: "Turquía" },
    { code: "TM", name: "Turkmenistán" },
    { code: "TC", name: "Islas Turks y Caicos" },
    { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ucrania" },
    { code: "AE", name: "Emiratos Árabes Unidos" },
    { code: "GB", name: "Reino Unido" },
    { code: "US", name: "Estados Unidos" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistán" },
    { code: "VU", name: "Vanuatu" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" },
    { code: "VG", name: "Islas Vírgenes Británicas" },
    { code: "VI", name: "Islas Vírgenes de los EEUU" },
    { code: "WF", name: "Wallis y Futuna" },
    { code: "EH", name: "Sahara Occidental" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabue" },
  ];
  const navigate = useNavigate();
  const { authState, patchUser } = useAuth(); 
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    postalCode: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authState.user && authState.user.isPremium) {
      //console.log("El usuario ahora es premium:", authState.user);
    }
  }, [authState.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formattedValue.replace(/\s/g, "");
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiryDate") {
      formattedValue = formattedValue.replace(/\D/g, "");
      formattedValue = formattedValue.substring(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{2})/, "$1/$2");
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  useEffect(() => {
    if (paymentStatus === true) {
      setTimeout(() => navigate('/user-area'), 1000);
    }
  }, [paymentStatus, navigate]);

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.cardNumber && formData.expiryDate && formData.cvv) {
      setIsLoading(true);

      setTimeout(async () => {
        try {
          if (authState.user.isPremium) {
            setPaymentStatus(true);
            return
          }
          await patchUser(authState.user._id, { isPremium: true });
          setPaymentStatus(true);

        } catch (error) {
          console.error("Error al actualizar el usuario a premium:", error);
        }finally {
          setIsLoading(false);
        }
      }, 3000);
    } else {
      alert("Por favor complete todos los campos.");
    }
  };

  return (
    <div className="payments-container">
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <>
        <div className="container-logoPremium">
          <img
            className="logoPremium"
            src={"https://res.cloudinary.com/dtsp1wfry/image/upload/v1712575273/PremiumLogo.png"}
          />
        </div>
          {authState.user.isPremium 
            ? <p>Disfruta de tu suscripción Premium</p>
            : <form className="form-payment" onSubmit={handleSubmit}>
            <label>
              <input
                className="Name"
                type="text"
                name="name"
                placeholder="Nombre Completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <div className="input-card-container">
              <label>
                <input
                  className="card"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                  pattern="\d{4} \d{4} \d{4} \d{4}"
                  required
                  placeholder="Número"
                />
                <div className="icons">
                  <i className="fab fa-cc-visa"></i>
                  <i className="fab fa-cc-mastercard"></i>
                  <i className="fab fa-cc-amex"></i>
                  <i className="fab fa-cc-discover"></i>
                </div>
              </label>
            </div>
            <div className="form-row">
              <label>
                <input
                  className="expiry"
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength="5"
                  pattern="\d{2}\/\d{2}"
                  placeholder="MM/AA"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  className="cvc"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  required
                  placeholder="CVV"
                />
              </label>
            </div>
            <div className="location-container">
              <label>
                <select
                  className="country-selector"
                  value={formData.country}
                  onChange={handleCountryChange}
                >
                  <option value="" >Elige un país</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <input
                  type="text"
                  className="postal-code"
                  name="postalCode"
                  placeholder="Código Postal"
                  maxLength="5"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
           
            <button type="submit">Pagar</button>
            {paymentStatus ? <p>El pago se ha realizado correctamente</p> : null}
              </form>
          }
          

          
        </>
      )}
    </div>
  );
}

export default Payments;
