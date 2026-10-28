export const getDestinations = async() => {
    const res = await fetch('http://localhost:5000/destinations')
    const data = await res.json() ;
    return data  ;
}

export const getDestination = async(id) => {
    const res = await fetch(`http://localhost:5000/destinations/${id}`)
    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`Failed to fetch destination: ${res.status} ${res.statusText}`);
    }

    const responseBody = await res.text();
    if (!responseBody.trim()) return null;

    return JSON.parse(responseBody);
}  