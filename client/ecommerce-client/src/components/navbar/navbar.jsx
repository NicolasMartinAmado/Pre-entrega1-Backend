import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/ContextUser';
import "./nav.css"

const TopNavbar = () => {
    const { token, setToken, setUser, user } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/session/logout`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                
            });
            
            if (response.ok) {
                setToken('');
                setUser({});
                navigate('/login');
            } else {
                console.error('Error during logout in backend section:', response);
            }
        } catch (error) {
            console.error('Error during logout request:', error);
        }
    };

    const isAuthenticated = Boolean(token && token.trim() !== '');

    return (
        <nav id='nav' className="bg-white shadow-md fixed-top" style={{display:'flex', justifyContent:'space-around'}}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div id='links' className="flex items-center">
                    <Link to="/" className="text-2xl font-semibold text-white hover:bg-[#8ed37f] hover:text-white px-2 py-1 rounded-md"> <h1>Messi Ecommerce</h1></Link>
                    
                    <div id='init' className="ml-6 space-x-4" style={{display:'flex', justifyContent:'space-around', color:'white'}}>
                    <Link to="/cart" className="relative flex items-center space-x-2">
                     <img id='cart' style={{display:'flex', justifyContent:'flex-end', width:100
                     }} src="../public\icons8-carrito-de-compras-96.png" alt="" />
                    </Link>
                        <Link to="/" className="text-white hover:text-gray-600">Inicio</Link>
                        <Link to="/chat" className="text-white hover:text-gray-600">Chat</Link>
                        <Link to="/products" className="text-white hover:text-gray-600">Productos</Link>
                        <Link to="/realtimeproducts" className="text-white hover:text-gray-700">Manejo de Productos</Link>
                    </div>
                </div>

                <div  className="">
                    

                    {isAuthenticated ? (
                        <button style={{paddingBottom:150}}
                            onClick={handleLogout}
                            className="bg-red-100 text-black px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link to="/login">
                            <button style={{paddingBottom:150}}  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Iniciar Sesión
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;