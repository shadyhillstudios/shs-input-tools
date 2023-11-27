import IMask from 'imask'
// import moment from 'moment'

export const integerMask = IMask.createMask({
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: ',',
    normalizeZeros: true,
    radix: '.'
})

export const dollarMask = IMask.createMask({
    mask: '$amount',
    blocks: {
        amount: {
            mask: Number,
            scale: 2,
            signed: true,
            thousandsSeparator: ',',
            normalizeZeros: false,
            radix: '.'
        }
    }
})

export const phoneMask = IMask.createMask({
    mask: '(000) 000-0000'
})

export const postalMask = IMask.createMask({
    mask: '*****-****'
})

// const momentFormat = 'MM/DD/YYYY'

const today = new Date()
const thisYear = today.getFullYear()

export const dateMask = IMask.createMask({
    // mask: '00/00/0000'
    // enable date mask
    mask: Date,

    // other options are optional
    // pattern: 'Y-`m-`d', // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
    pattern: 'm{/}`d{/}`Y',
    // you can provide your own blocks definitions, default blocks for date mask are:
    blocks: {
        d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2
        },
        m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
        },
        Y: {
            mask: IMask.MaskedRange,
            from: 0,
            to: thisYear + 10,
            maxLength: 4
        }
    },
    // define date -> str convertion
    format: function (date) {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }

        return [year, month, day].join('/')
    },
    // define str -> date convertion
    parse: function (str) {
        let yearMonthDay = str.split('/')
        return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2])
    },

    // optional interval options

    // defaults to `1900-01-01`
    min: new Date(),
    // defaults to `9999-01-01`
    max: new Date(thisYear + 2, 0, 1),

    autofix: 'pad',

    // also Pattern options can be set
    lazy: true

    // and other common options
    // overwrite: true // defaults to `false`
    // mask: [
    //     { mask: '' },
    //     {
    //         mask: Date,
    //         pattern: momentFormat,
    //         lazy: false,
    //         min: new Date(),
    //         max: new Date(2020, 11, 31),
    //         format: function (date) {
    //             return moment(date).format(momentFormat)
    //         },
    //         parse: function (str) {
    //             return moment(str, momentFormat)
    //         },
    //         blocks: {
    //             YYYY: {
    //                 mask: IMask.MaskedRange,
    //                 from: 1970,
    //                 to: 2030
    //             },
    //             MM: {
    //                 mask: IMask.MaskedRange,
    //                 from: 1,
    //                 to: 12
    //             },
    //             DD: {
    //                 mask: IMask.MaskedRange,
    //                 from: 1,
    //                 to: 31
    //             }
    //         }
    //     }
    // ]
})

export const percentageMask = IMask.createMask({
    mask: [
        { mask: '' },
        {
            mask: 'num%',
            lazy: false,
            blocks: {
                num: {
                    mask: Number,
                    scale: 2,
                    min: -100,
                    max: 100,
                    radix: '.',
                    normalizeZeros: false,
                    mapToRadix: [',']
                }
            }
        }
    ]
})

export const displayPercentageMask = IMask.createMask({
    mask: [
        { mask: '' },
        {
            mask: 'num%',
            lazy: false,
            blocks: {
                num: {
                    mask: Number,
                    scale: 2,
                    radix: '.',
                    normalizeZeros: false
                }
            }
        }
    ]
})
