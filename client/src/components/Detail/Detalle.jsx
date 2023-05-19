import React from "react";
import { Link, useParams ,useSearchParams,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetalle,
    deleteDetalle,
    setStatusRefresch,
    deletePokemon,
    setPagina,
    setPokemons,
    setDetalleUpdate} from '../../actions'
import Loading from '../Loading/Loading';
import { IMG_POKEMON_DAFULT,CIRCLE_STATADICT } from "../../Constans/img"; 
import style from './Detalle.module.css'

import imageFuerza from  '../../img/fuerza.png';
import imageVida from  '../../img/vida.png';
import imageAltura from  '../../img/altura2.png';
import imageDefensa from  '../../img/defensa.png';
import imagenVelocidad from '../../img/velocidad.png';
import imagenPeso from '../../img/peso.png';

export default function Detalle(){
    const dispatch       = useDispatch();
    const [searchParams] = useSearchParams();
    let {id}             = useParams();
    const pokemon        = useSelector(state => state.detalle);
    const navigate       = useNavigate();

    useEffect(() => {
        const fuenteBusqueda=searchParams.get('origenBD');
        dispatch(getDetalle(id+'?origenBD='+fuenteBusqueda));
        dispatch(setStatusRefresch(false));
        return () => {dispatch(deleteDetalle([]))}
    },[id])

    function handleDelete(id) {
        dispatch(deletePokemon(id));
        dispatch(setPagina(1))
        dispatch(setStatusRefresch(true));
        dispatch(setPokemons([]));
        navigate('/home');
    }

    function handleUpdate() {
        dispatch(setDetalleUpdate(pokemon))
        navigate('/update');
    }

    return(
        <>
            {
                pokemon.length>0 ?(
                    <div className={style.fondo}>
                        <div>
                            <img src={pokemon[0].urlImagen?pokemon[0].urlImagen:IMG_POKEMON_DAFULT} alt={pokemon[0].name} width="300px" height="300px" />
                        </div>
                        <div >
                            <span >#{pokemon[0].id}</span>
                            <h1 className={style.nombre}>{pokemon[0].name.charAt(0).toUpperCase()+pokemon[0].name.slice(1)}</h1>
                            <div className={style.container__rypes}>
                            {
                                pokemon[0].tipos?.map(data => 
                                    (
                                            <div key={data.id}  className={`${style[data.nombre]}`}><strong>{data.nombre.charAt(0).toUpperCase()+data.nombre.slice(1)}</strong></div>
                                    )
                                )
                            }
                            </div>
                         </div>
                        <div className={style.contenedorEstaditica}>
                             <div className={style.margenConterSubDiv}>
                                <div>
                                    <label className={style.value}> {pokemon[0].vida}</label><br/>
                                    <img src={imageVida} atl="Vida" width="20px" height="20px"/>
                                    <span>HP</span>
                                </div>
                                <div>
                                    <label className={style.value}>{pokemon[0].defensa}</label><br/>
                                    <img src={imageDefensa} atl="Defensa" width="20px" height="20px"/>
                                    <span>Defense</span>
                                </div>
                               
                            </div>
                            <div className={style.margenConterSubDiv}>
                                 <div>
                                    <label className={style.value}>{pokemon[0].fuerza}</label><br/>
                                    <img src={imageFuerza} atl="fuerza" width="20px" height="20px"/>
                                    <span>Attack</span>       
                                </div>
                                <div>
                                    <label className={style.value}>{pokemon[0].velocidad}</label><br/>
                                    <img src={imagenVelocidad} atl="Velocidad" width="22px" height="22px"/>
                                    <span>Speed</span>
                                </div>
                                
                            </div>
                            <div className={style.margenConterSubDiv}>
                                <div>
                                    <label className={style.value}>{pokemon[0].altura}</label><br/>
                                    <img src={imageAltura} atl="Altura" width="20px" height="20px"/>
                                    <label>Height</label>
                                </div>
                                <div>
                                    <label className={style.value}>{pokemon[0].peso}</label><br/>
                                    <img src={imagenPeso} atl="Peso" width="22px" height="22px"/>
                                    <span>Weight</span>
                                </div>
                            </div>
                        </div>
                         <div className={style.contendorBotones}>
                             {pokemon[0].createinDb && <button onClick={(e) => handleDelete(pokemon[0].id)} className={style.btnDelete}>Delete</button> }
                            <Link to="/home">
                                <button className={style.goBack}>Go Back</button>
                            </Link>
                            {pokemon[0].createinDb &&  <button onClick={e =>handleUpdate()} className={style.btnUpdate}>Update</button>}
                         </div>
                    </div>
                )
                :(<Loading/>)
            }
        </>
    )

}
