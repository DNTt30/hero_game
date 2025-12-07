module hero_game::hero {
    // Các dòng use này bị cảnh báo vàng, nhưng cứ giữ nguyên cho chắc
    use iota::object::{Self, UID};
    use iota::tx_context::{Self, TxContext};
    use iota::transfer;
    use iota::url::{Self, Url};
    use std::string::{Self, String};

    public struct Hero has key, store {
        id: UID,
        name: String,
        strength: u64,
        level: u64,
        img_url: Url,
    }

    // Hàm tạo tướng
    public entry fun mint_hero(
        name_bytes: vector<u8>,
        url_bytes: vector<u8>,
        ctx: &mut TxContext
    ) {
        let hero = Hero {
            id: object::new(ctx),
            name: string::utf8(name_bytes),
            strength: 10,
            level: 1,
            img_url: url::new_unsafe_from_bytes(url_bytes)
        };
        transfer::public_transfer(hero, tx_context::sender(ctx));
    }

    // Hàm luyện tập
    public entry fun train(hero: &mut Hero) {
        hero.strength = hero.strength + 5;
        hero.level = hero.level + 1;
    }

}