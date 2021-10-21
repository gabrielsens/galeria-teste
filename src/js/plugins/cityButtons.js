import $ from 'jquery'
import { onLoadHtmlSucess } from '../core/includes'


const duration = 600

function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        const isTarget = $(this).attr('wm-city') === city
            || city === null
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}


const cityButtons = $('[wm-city-buttons]')

$.fn.cityButtons = function () {
    const cities = new Set
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info', 'col-12', 'col-md-6', 'col-lg-2', 'pl-0', 'pr-0', 'rounded-0']).html(city)
        btn.click(e => filterByCity(city))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active', 'col-12', 'col-md-6', 'col-lg-2', 'pl-0', 'pr-0', 'rounded-0']).html('Todas')
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll)
    const btnGroup = $('<div>').addClass(['btn-group', 'row', 'd-flex', 'justify-content-center', 'ml-1', 'mr-1'])
    btnGroup.append(btns)
    $(this).html(btnGroup)
    return this
}

onLoadHtmlSucess(function () {
    $('[wm-city-buttons]').cityButtons()
})
