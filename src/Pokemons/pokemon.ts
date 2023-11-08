export interface Pokemon {
    name: string,
    id: number,
    types: {
        type: {
            name: string,
        }
    }[],
    weight: number,
    height: number,
    sprites: {
        other: {
            "official-artwork": {
                front_default: string,
            }
        }
    }     
}
