/* 
DOCUMENTATION: http://acnhapi.com/doc
REPOSITORY: https://github.com/alexislours/ACNHAPI
*/

const artApp = {};

artApp.getArt = async () => {
    const artData = await $.ajax({
    url: `https://acnhapi.com/v1a/art/`,
    method: `GET`,
    dataType: `json`
    })
    console.log('hooray data!', artData)

    artData.forEach(function (art) {
        // create the html code for the art pieces with the genuine stamp
        const genuineArtHTML = `
            <li class='uncheck'>
            ${art.name['name-USen']}
            <img src='${art.image_uri}'>
            <img src='assets/genuine.png' class='stamp' title="This work is always genuine.">
            </li>
            `

        // create the html code for art pieces that are not always genuine
        const artHTML = `
        <li class='uncheck'>
        ${art.name['name-USen']}
        <img src='${art.image_uri}'>
        </li>
        `;
        
        // determine if an art piece is always genuine by seeing if .hasFake is true
        // if it is always genuine, append genuineArtHTML
        // if it can be fake, appent artHTML
        if (art.hasFake === true) {
            $('ul').append(artHTML);
        } else {
            $('ul').append(genuineArtHTML);
        }
});
}

artApp.searchBar = function() {
    // I'll admit I found this chunk of code on the internet and repurposed it, but it all mostly makes sense to me... besides the "index" as a parameter not being used. But if I get rid of it, the search function doesn't work.
    $('#searchText').on('keyup', function() {
        let searchString = $(this).val();
        $("ul li").each(function(index, value) {
        currentName = $(value).text()
        if( currentName.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
            $(value).show();
        } else {
            $(value).hide();
        }
        });
    });
};

artApp.clickCheck = function () {
    $(document).on('click', 'li', function () {
        // when you click on an item, add a checkmark and change the background colour
        if ($(this).hasClass('uncheck') === true) {
            $(this).append(`<img src='assets/checked.png' class='checkmark'>`);
            $(this).removeClass('uncheck').addClass('check');
        // when you click on an item that already has a checkmark, remove it and revert the background colour
        } else {
            $(this).children().last().remove()
            $(this).removeClass('check').addClass('uncheck');
        }
    });
};

artApp.init = () => {
    artApp.getArt();
    artApp.clickCheck();
    artApp.searchBar();
}

$(document).ready(function () {
    artApp.init();
})

