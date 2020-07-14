const size = {
    mobileM: '375px',
    mobileL: '425px',
    tablet: '600px',
    tabletL: '768px',
    laptop: '888px',
    laptopM: '1024px',
    laptopL: '1440px'
}

export const device = {
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    tabletL: `(min-width: ${size.tabletL})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopM: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`
}
