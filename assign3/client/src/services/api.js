import axios from 'axios'

const URL = 'http://localhost/Assignment_for_helper4u/Assign3/index.php'

export const addUser = async(data) => {
    try {
            axios.post(`${URL}`, (data)).then((response) => {
                console.log(response.data);
            });
        
    } catch (error) {
        console.log(`hello shreyas${error}`)
    }
}