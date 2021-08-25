import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    dark:'#EB5937',
    lightdark:'#000000',
    darkgray:'#2e2f30',
    lightgray:'#3b3c3d',
    white:'#ffffff',
    lightyellow:'#fde8c2',
    lightred:'#fbd5c8',
    limegray:'#808080'
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 20,

    // font sizes
    largeTitle: 25,
    h1: 16,
    h2: 14,
    h3: 12,
    h4: 10,
    body1: 16,
    body2: 14,
    body3: 12,
    body4: 10,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 30},
    h1: {  fontSize: SIZES.h1, lineHeight: 20},
    h2: {  fontSize: SIZES.h2, lineHeight: 18 },
    h3: {fontSize: SIZES.h3, lineHeight: 16 },
    h4: { fontSize: SIZES.h4, lineHeight: 14 },
    body1: { fontSize: SIZES.body1, lineHeight: 20},
    body2: { fontSize: SIZES.body2, lineHeight: 18 },
    body3: {fontSize: SIZES.body3, lineHeight: 16},
    body4: {  fontSize: SIZES.body4, lineHeight: 14 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;