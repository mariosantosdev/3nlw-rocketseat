import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useHistory } from "react-router-dom";

import api from '../services/api';
import { happyMapIcon, mapMarker } from '../utils/mapIcons'
import '../styles/pages/orphanages_map.css'

interface IOrphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

    const { goBack } = useHistory();

    useEffect(() => {
        api.get('/orfanatos')
            .then(response => {
                setOrphanages(response.data)
            })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita <span>😊</span></p>
                </header>

                <footer>
                    <div className="button-left">
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                    </div>
                    <div className="infos-city">
                        <strong>Oliveira</strong>
                        <span>Minas Gerais</span>
                    </div>

                </footer>
            </aside>

            <Map
                center={[-20.6979596, -44.8249617]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={happyMapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                {orphanage.name}
                                <Link to={`/orfanatos/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orfanatos/novo" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;