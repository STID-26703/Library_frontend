import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import LibraryButton from './LibraryButton'

const OFFICES_URL = 'http://localhost:8080/api/offices'

function Office() {
    const [officeName, setOfficeName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [offices, setOffices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const filteredOffices = offices.filter((office) => {
        const query = searchTerm.trim().toLowerCase()
        return (
            office.name.toLowerCase().includes(query) ||
            office.roomNumber.toString().toLowerCase().includes(query)
        )
    })

    const loadOffices = useCallback(() => {
        return axios
            .get(OFFICES_URL)
            .then((response) => {
                setOffices(response.data)
                setError('')
            })
            .catch((requestError) => {
                console.error('Error loading offices:', requestError)
                setError('Could not load offices. Please try again.')
            })
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        loadOffices()
    }, [loadOffices])

    async function handleSave() {
        try {
            await axios.post(OFFICES_URL, {
                name: officeName,
                roomNumber,
            })
            alert('Office saved successfully!')
            setOfficeName('')
            setRoomNumber('')
            await loadOffices()
        } catch (requestError) {
            console.error('Error saving office:', requestError)
            alert('Error saving office!')
        }
    }

    async function handleDelete(office) {
        try {
            await axios.delete(`${OFFICES_URL}/room/${office.roomNumber}`)
            setOffices((currentOffices) =>
                currentOffices.filter((item) => item.roomNumber !== office.roomNumber),
            )
            alert('Office deleted successfully!')
        } catch (requestError) {
            console.error('Error deleting office:', requestError)
            alert('Error deleting office!')
        }
    }

    return (
        <div>
            <h1>SAVE OFFICE</h1>
            <label htmlFor="officeName">Office Name:</label>
            <input
                type="text"
                id="officeName"
                value={officeName}
                onChange={(event) => setOfficeName(event.target.value)}
            />
            <br />

            <label htmlFor="roomNumber">Room Number:</label>
            <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(event) => setRoomNumber(event.target.value)}
            />
            <LibraryButton buttonLabel="Save" onClickButton={handleSave} />

            <h2>OFFICES</h2>
            <label htmlFor="officeSearch">Search by office name or room number: </label>
            <input
                type="search"
                id="officeSearch"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Office name or room number"
            />
            {isLoading ? (
                <p>Loading offices...</p>
            ) : error ? (
                <p role="alert">{error}</p>
            ) : offices.length === 0 ? (
                <p>No offices found.</p>
            ) : filteredOffices.length === 0 ? (
                <p>No offices match your search.</p>
            ) : (
                <table className="office-table">
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Office Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOffices.map((office) => (
                            <tr key={office.roomNumber}>
                                <td>{office.roomNumber}</td>
                                <td>{office.name}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(office)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Office
