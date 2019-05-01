import React from 'react'
import axios from 'axios'

export default class ReservationList extends React.Component {
    state = {
        Properties: null,
        ready: false
    }

    componentDidMount() {
        this.getProperties()
    }

    getProperties() {
        axios.get('/properties.json')
        .then((res) => {
            this.setState({
                Properties: res.data,
                read : true
            })

        })
    }

    render() {
        const { Properties } = this.state
        return (
            <div class="Helloworld">
            <script>{Properties}</script>
            </div>
        )
    }
}