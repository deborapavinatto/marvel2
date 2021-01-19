export default class CreatePages {
    createPageShowCharacters(thumbnailPath, thumbnailExtension, name, id) {
        const character = `<div class="character">
        <img src="${thumbnailPath}.${thumbnailExtension}" alt="${name}" class="characterImage" id="${id}">
        <p class="characterName">${name}</p>
    </div>`;
        return character
    }

    createPageCharacterInfo(thumbnailPath, thumbnailExtension, name, description) {
        const characterInfoPage = `<div class="characterInfoPage--pageTop">
        <img src="${thumbnailPath}.${thumbnailExtension}" alt="${name}">
        <div class="div--characterDescription">
            <div class="characterName"><p>${name}</p></div>
            <p class="characterDescription">${description}</p>
        </div>
    </div>
    <div class="comics"></div>`
        return characterInfoPage
    }

    createComicsInfos(name) {
        const createComicsInfo = ` <div class="comicsInfo">
        <img class="comicsImage" src="./images/marvel_image_not_found.jpg" alt="">
        <p class="comicsName">${name}</p>
    </div>`
        return createComicsInfo
    }
    
    createPagination(i) {
        const pagination = ` <div class="page-item">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </div>`
      return pagination
    }
}