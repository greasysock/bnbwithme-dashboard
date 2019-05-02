import Pickr from '@simonwep/pickr/dist/picker.min'
import '@simonwep/pickr/dist/pickr.min.css'

console.log("hello world@")

const pickr = Pickr.create({
    el: '.color-picker',

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
})