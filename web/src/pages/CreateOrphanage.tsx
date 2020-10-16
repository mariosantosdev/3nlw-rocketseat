import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from "react-icons/fi";

import { happyMapIcon } from '../utils/mapIcons'
import Sidebar from '../components/Sidebar'

import api from "../services/api";
import '../styles/pages/create-orphanage.css';
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
	const history = useHistory()

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
	const [name, setName] = useState('')
	const [about, setAbout] = useState('')
	const [instructions, setInstructions] = useState('')
	const [openingHours, setOpeningHours] = useState('')
	const [openOnWeekends, setOpenOnWeekends] = useState(true)

	const [images, setImages] = useState<File[]>([])
	const [previewImages, setPreviewImages] = useState<string[]>([])

	const handleMapClick = (event: LeafletMouseEvent) => {
		const { lat, lng } = event.latlng
		setPosition({ latitude: lat, longitude: lng })
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		const { latitude, longitude } = position
		const data = new FormData()
		
		if (latitude == 0 || longitude == 0) return alert('Escolha uma localização')

		data.append('name', name)
		data.append('about', about)
		data.append('instructions', instructions)
		data.append('opening_hours', openingHours)
		data.append('open_on_weekends', String(openOnWeekends))
		data.append('latitude', String(latitude))
		data.append('longitude', String(longitude))

		images.forEach(image => {
			data.append('images', image)
		})

		api.post('/orfanatos', data)
		.then(() => {
			alert('Cadastro realizado com sucesso.')
			history.push('/mapa')
		})
		.catch(res => {
			alert('Ocorreu um erro ao cadastrar um orfanato.')
			console.log(res);
		})
	}

	const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return

		const selectedImages = Array.from(event.target.files)

		const selectedImagesPreview = selectedImages.map(image => {
			return URL.createObjectURL(image)
		})

		setImages(selectedImages)
		setPreviewImages(selectedImagesPreview)
	}

	return (
		<div id="page-create-orphanage">
			<Sidebar />
			<main>
				<form className="create-orphanage-form">
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={[-20.6979596, -44.8249617]}
							style={{ width: '100%', height: 280 }}
							zoom={15}
							onClick={handleMapClick}
						>
							<TileLayer
								url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
							/>

							{position.latitude !== 0 && (
								<Marker
									interactive={false}
									icon={happyMapIcon}
									position={[position.latitude, position.longitude]}
								/>
							)}
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input
								id="name"
								value={name}
								onChange={event => setName(event.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
							<textarea
								id="about"
								maxLength={300}
								value={about}
								onChange={event => setAbout(event.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container">
								{previewImages.map(image => {
									return(
										<img key={image} src={image} alt={name} />
									)
								})}
								<label htmlFor="image[]" className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label>
							</div>
							<input
								multiple
								type="file"
								id="image[]"
								onChange={handleSelectImages}
							/>

						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea
								id="instructions"
								value={instructions}
								onChange={event => setInstructions(event.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">Horário de visita</label>
							<input
								id="opening_hours"
								value={openingHours}
								onChange={event => setOpeningHours(event.target.value)}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">Atende fim de semana</label>

							<div className="button-select">
								<button
									type="button"
									className={openOnWeekends ? 'active' : ''}
									onClick={() => setOpenOnWeekends(true)}
								>
									Sim
								</button>

								<button
									type="button"
									className={!openOnWeekends ? 'active' : ''}
									onClick={() => setOpenOnWeekends(false)}
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit" onClick={handleSubmit}>
						Confirmar
          			</button>
				</form>
			</main>
		</div>
	);
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
