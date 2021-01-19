import axios from 'axios'
import CreatePages from './classes/createpages'

const createPages = new CreatePages()

export default class App {
    getCharacters() {
        axios.get('http://localhost:3333/characters')
    .then(response => {
        this.showCharacters(response.data.results)
        this.showCharacterInfo(response.data.results)
        this.setPagination(response.data.total)
        this.setLimit(response.data.limit)
    })
    .catch(error => console.log(error))
    }

    getCharacter(characterid) {
        axios.get(`http://localhost:3333/characters/${characterid}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    showCharacters(data) {
       document.querySelector('.showCharacters').innerHTML = ''
        data.forEach(item => {
            if (item.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' || item.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708') {
                console.log('imagem não encontrada')
                item.thumbnail.path = '/images/marvel_image_not_found'
                item.thumbnail.extension = 'jpg'
            }
            document.querySelector('.showCharacters').innerHTML += createPages.createPageShowCharacters(item.thumbnail.path, item.thumbnail.extension, item.name, item.id);
        });
    }

    showCharacterInfo(data) {
        for (let img of document.getElementsByClassName('characterImage')) {
            img.addEventListener('click', () => {
                
              data.find(element => {
                  if (element.id == img.id) {
                    if (element.description === '') {
                        element.description = `Personagem ${element.name} não tem descrição.`
                    }

                    if (element.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' || element.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708') {
                        element.thumbnail.path = '/images/marvel_image_not_found'
                        element.thumbnail.extension = 'jpg'
                    }
                    
                    document.getElementsByClassName('showCharacters')[0].classList.add('hidden')
                    document.getElementsByClassName('characterInfoPage')[0].innerHTML +=  createPages.createPageCharacterInfo(element.thumbnail.path, element.thumbnail.extension, element.name, element.description)
                    console.log(element.id)
                    element.comics.items.forEach(element => {
                        this.createComicsInfos(element.name)
                    })
                  }
              })
            })
            this.backPage()
        }
    }

    createComicsInfos(name) {
        document.getElementsByClassName('comics')[0].innerHTML += createPages.createComicsInfos(name)
    }

    setPagination(totalItems) {
        const pages = Math.ceil(totalItems / 100)
        const pagination = document.getElementsByClassName('pagination')[0]

        pagination.innerHTML = ''
        for (let i = 1; i <= pages; i++) {
            pagination.innerHTML += createPages.createPagination(i)

            for (let link of document.getElementsByClassName('page-link')) {
                link.addEventListener('click', event => {
                    event.preventDefault()
                    let offset = 0
                    const page = event.target.dataset.page
                    offset = (parseInt(page) - 1) * 100
                    this.getCharacters()
                })
            }
        }
    }

    backPage() {
        document.getElementsByClassName('btn-backPage')[0].addEventListener('click', () => {
            document.getElementsByClassName('characterInfoPage')[0].innerHTML = ''
            document.getElementsByClassName('showCharacters')[0].classList.remove('hidden')
        })
    }

    checkImageNotFound(thumbnailPath) {
        if (thumbnailPath == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
            console.log('imagem não encontrada')
            item.thumbnail.path = '/images/marvel_image_not_found'
            item.thumbnail.extension = 'jpg'
        }
    }

}   