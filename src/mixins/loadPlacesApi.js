/* eslint-disable */
export default {
    data(){
      return {
          autocomplete: null,
          listener: null
      }
    },
    methods:{
        initAutocomplete(inputId, callback){
            this.autocomplete = new google.maps.places.Autocomplete(
                document.getElementById(inputId),
                {
                    types: ['address'],
                    fields: ['address_components', 'geometry']
                }
            )

            this.listener = this.autocomplete.addListener('place_changed', callback)
        },
        removeAutoComplete(){
            google.maps.event.removeListener(this.listener);
            google.maps.event.clearInstanceListeners(this.autocomplete);
            const pacContainers = document.querySelectorAll(".pac-container")
            pacContainers.forEach(pac => {
                pac.remove();
            });
        }
    }
}
