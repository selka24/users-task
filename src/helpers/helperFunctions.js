export const flattenObj= (ob) => {
    // The object which contains the
    // final result
    let result = {};
    // loop through the object "ob"
    for (const i in ob) {
        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {
                // Store temp in result
                result[j] = temp[j];
            }
        }
        // Else store ob[i] in result directly
        else {
            result[i] = ob[i];
        }
    }
    return result;
};

export const retrieveGooglePlacesInfo = ({address_components, geometry}) => {
    if(!geometry)
        return null
    const selectedAddress = {};
    address_components.forEach(({types, long_name}) => {
        if (types.includes('route')) {
            selectedAddress.street = long_name
        } else if (types.includes('locality')) {
            selectedAddress.city = long_name
        } else if(types.includes('postal_code')) {
            selectedAddress.zipcode = long_name
        }
    })
    selectedAddress.lat = geometry.location.lat();
    selectedAddress.lng = geometry.location.lng();
    return selectedAddress
}

export const getInputProperties = (formInput) => {
    // eslint-disable-next-line
    const {label, key, ...rest} = formInput
    return {inputProperties: {id: key, ...rest}, label}
}
