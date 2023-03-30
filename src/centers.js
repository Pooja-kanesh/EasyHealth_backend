async function getState() {
    const response = await fetch(
        "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    );
    const data = await response.json();
    const state = data.states;
}