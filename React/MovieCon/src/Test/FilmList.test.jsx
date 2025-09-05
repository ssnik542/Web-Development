import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import FilmList from "../components/FilmList";

const films = [
    {
        "adult": false,
        "backdrop_path": "/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg",
        "genre_ids": [
            28,
            878,
            27
        ],
        "id": 615656,
        "original_language": "en",
        "original_title": "Meg 2: The Trench",
        "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
        "popularity": 4372.097,
        "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
        "release_date": "2023-08-02",
        "title": "Meg 2: The Trench",
        "video": false,
        "vote_average": 7,
        "vote_count": 1563
    },
    {
        "adult": false,
        "backdrop_path": "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
        "genre_ids": [
            35,
            12,
            14
        ],
        "id": 346698,
        "original_language": "en",
        "original_title": "Barbie",
        "overview": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
        "popularity": 3486.508,
        "poster_path": "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        "release_date": "2023-07-19",
        "title": "Barbie",
        "video": false,
        "vote_average": 7.4,
        "vote_count": 4007
    },
    {
        "adult": false,
        "backdrop_path": "/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
        "genre_ids": [
            16,
            35,
            10751,
            14,
            10749
        ],
        "id": 976573,
        "original_language": "en",
        "original_title": "Elemental",
        "overview": "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
        "popularity": 1683.227,
        "poster_path": "/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
        "release_date": "2023-06-14",
        "title": "Elemental",
        "video": false,
        "vote_average": 7.8,
        "vote_count": 1813
    },
    {
        "adult": false,
        "backdrop_path": "/53z2fXEKfnNg2uSOPss2unPBGX1.jpg",
        "genre_ids": [
            27,
            9648,
            53
        ],
        "id": 968051,
        "original_language": "en",
        "original_title": "The Nun II",
        "overview": "1956 – France. A priest is murdered. An evil is spreading. The sequel to the worldwide smash hit follows Sister Irene as she once again comes face-to-face with Valak, the demon nun.",
        "popularity": 1812.129,
        "poster_path": "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
        "release_date": "2023-09-06",
        "title": "The Nun II",
        "video": false,
        "vote_average": 7,
        "vote_count": 63
    },
    {
        "adult": false,
        "backdrop_path": "/2ii07lSwHarg0gWnJoCYL3Gyd1j.jpg",
        "genre_ids": [
            35,
            12
        ],
        "id": 912908,
        "original_language": "en",
        "original_title": "Strays",
        "overview": "When Reggie is abandoned on the mean city streets by his lowlife owner, Doug, Reggie is certain that his beloved owner would never leave him on purpose. But once Reggie falls in with Bug, a fast-talking, foul-mouthed stray who loves his freedom and believes that owners are for suckers, Reggie finally realizes he was in a toxic relationship and begins to see Doug for the heartless sleazeball that he is.",
        "popularity": 1691.43,
        "poster_path": "/n1hqbSCtyBAxaXEl1Dj3ipXJAJG.jpg",
        "release_date": "2023-08-17",
        "title": "Strays",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 151
    },
    {
        "adult": false,
        "backdrop_path": "/waBWlJlMpyFb7STkFHfFvJKgwww.jpg",
        "genre_ids": [
            28,
            18
        ],
        "id": 678512,
        "original_language": "en",
        "original_title": "Sound of Freedom",
        "overview": "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
        "popularity": 1155.257,
        "poster_path": "/kSf9svfL2WrKeuK8W08xeR5lTn8.jpg",
        "release_date": "2023-07-03",
        "title": "Sound of Freedom",
        "video": false,
        "vote_average": 8.1,
        "vote_count": 430
    },
    {
        "adult": false,
        "backdrop_path": "/w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg",
        "genre_ids": [
            16,
            35,
            28
        ],
        "id": 614930,
        "original_language": "en",
        "original_title": "Teenage Mutant Ninja Turtles: Mutant Mayhem",
        "overview": "After years of being sheltered from the human world, the Turtle brothers set out to win the hearts of New Yorkers and be accepted as normal teenagers through heroic acts. Their new friend April O'Neil helps them take on a mysterious crime syndicate, but they soon get in over their heads when an army of mutants is unleashed upon them.",
        "popularity": 1402.547,
        "poster_path": "/sGm09gLVyICQl8lVIHpmHZAgSNq.jpg",
        "release_date": "2023-07-31",
        "title": "Teenage Mutant Ninja Turtles: Mutant Mayhem",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 380
    },
    {
        "adult": false,
        "backdrop_path": "/qEm4FrkGh7kGoEiBOyGYNielYVc.jpg",
        "genre_ids": [
            27,
            14
        ],
        "id": 635910,
        "original_language": "en",
        "original_title": "The Last Voyage of the Demeter",
        "overview": "The crew of the merchant ship Demeter attempts to survive the ocean voyage from Carpathia to London as they are stalked each night by a merciless presence onboard the ship.",
        "popularity": 947.355,
        "poster_path": "/nrtbv6Cew7qC7k9GsYSf5uSmuKh.jpg",
        "release_date": "2023-08-09",
        "title": "The Last Voyage of the Demeter",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 482
    },
    {
        "adult": false,
        "backdrop_path": "/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
        "genre_ids": [
            28,
            12,
            878
        ],
        "id": 667538,
        "original_language": "en",
        "original_title": "Transformers: Rise of the Beasts",
        "overview": "When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.",
        "popularity": 1000.3,
        "poster_path": "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
        "release_date": "2023-06-06",
        "title": "Transformers: Rise of the Beasts",
        "video": false,
        "vote_average": 7.5,
        "vote_count": 3107
    },
    {
        "adult": false,
        "backdrop_path": "/AeR5k8Sp3zc2Ql4tT6CmgqspsEq.jpg",
        "genre_ids": [
            12,
            10751,
            14,
            10749
        ],
        "id": 447277,
        "original_language": "en",
        "original_title": "The Little Mermaid",
        "overview": "The youngest of King Triton’s daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father’s crown – in jeopardy.",
        "popularity": 803.608,
        "poster_path": "/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
        "release_date": "2023-05-18",
        "title": "The Little Mermaid",
        "video": false,
        "vote_average": 6.6,
        "vote_count": 1880
    },
    {
        "adult": false,
        "backdrop_path": "/rRcNmiH55Tz0ugUsDUGmj8Bsa4V.jpg",
        "genre_ids": [
            35,
            10749
        ],
        "id": 884605,
        "original_language": "en",
        "original_title": "No Hard Feelings",
        "overview": "On the brink of losing her childhood home, Maddie discovers an intriguing job listing: wealthy helicopter parents looking for someone to “date” their introverted 19-year-old son, Percy, before he leaves for college. To her surprise, Maddie soon discovers the awkward Percy is no sure thing.",
        "popularity": 595.408,
        "poster_path": "/gD72DhJ7NbfxvtxGiAzLaa0xaoj.jpg",
        "release_date": "2023-06-15",
        "title": "No Hard Feelings",
        "video": false,
        "vote_average": 7.2,
        "vote_count": 1166
    },
    {
        "adult": false,
        "backdrop_path": "/4vlsYpItGVZN1UWZGqQBoCzrUSw.jpg",
        "genre_ids": [
            53
        ],
        "id": 1030987,
        "original_language": "en",
        "original_title": "Sympathy for the Devil",
        "overview": "After being forced to drive a mysterious passenger at gunpoint, a man finds himself in a high-stakes game of cat and mouse where it becomes clear that not everything is as it seems.",
        "popularity": 588.786,
        "poster_path": "/afGdVMa80LMs6ibLP22CwM5uI4e.jpg",
        "release_date": "2023-07-20",
        "title": "Sympathy for the Devil",
        "video": false,
        "vote_average": 6.3,
        "vote_count": 82
    },
    {
        "adult": false,
        "backdrop_path": "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
        "genre_ids": [
            18,
            36
        ],
        "id": 872585,
        "original_language": "en",
        "original_title": "Oppenheimer",
        "overview": "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
        "popularity": 574.149,
        "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        "release_date": "2023-07-19",
        "title": "Oppenheimer",
        "video": false,
        "vote_average": 8.3,
        "vote_count": 3305
    },
    {
        "adult": false,
        "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
        "genre_ids": [
            16,
            10751,
            12,
            14,
            35
        ],
        "id": 502356,
        "original_language": "en",
        "original_title": "The Super Mario Bros. Movie",
        "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
        "popularity": 606.752,
        "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        "release_date": "2023-04-05",
        "title": "The Super Mario Bros. Movie",
        "video": false,
        "vote_average": 7.8,
        "vote_count": 6539
    },
    {
        "adult": false,
        "backdrop_path": "/lDCIQ1Qe7cRnhZ4ybQVVEbadMZ.jpg",
        "genre_ids": [
            27,
            53
        ],
        "id": 1008042,
        "original_language": "en",
        "original_title": "Talk to Me",
        "overview": "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
        "popularity": 592.394,
        "poster_path": "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
        "release_date": "2023-07-26",
        "title": "Talk to Me",
        "video": false,
        "vote_average": 7.1,
        "vote_count": 301
    },
    {
        "adult": false,
        "backdrop_path": "/3mrli3xsGrAieQks7KsBUm2LpCg.jpg",
        "genre_ids": [
            28,
            80,
            53
        ],
        "id": 979275,
        "original_language": "en",
        "original_title": "Mob Land",
        "overview": "A sheriff tries to keep the peace when a desperate family man violently robs a pill mill with his brother-in-law, alerting an enforcer for the New Orleans mafia.",
        "popularity": 596.429,
        "poster_path": "/mcz8oi9oCgq1wkA3Wz2kluE94pE.jpg",
        "release_date": "2023-08-04",
        "title": "Mob Land",
        "video": false,
        "vote_average": 6.2,
        "vote_count": 15
    },
    {
        "adult": false,
        "backdrop_path": "/AvSeU3ji59QLN2tfWXzVqI6hg8x.jpg",
        "genre_ids": [
            27,
            9648
        ],
        "id": 532408,
        "original_language": "en",
        "original_title": "The Boogeyman",
        "overview": "Still reeling from the tragic death of their mother, a teenage girl and her younger sister find themselves plagued by a sadistic presence in their house and struggle to get their grieving father to pay attention before it’s too late.",
        "popularity": 452.926,
        "poster_path": "/pYwZdnXVnVxAr7dx4MEK7tTK9gI.jpg",
        "release_date": "2023-05-31",
        "title": "The Boogeyman",
        "video": false,
        "vote_average": 6.7,
        "vote_count": 328
    },
    {
        "adult": false,
        "backdrop_path": "/h0nmmdFAdBjQttN8Y0q825MWzZp.jpg",
        "genre_ids": [
            28,
            53,
            80
        ],
        "id": 926393,
        "original_language": "en",
        "original_title": "The Equalizer 3",
        "overview": "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
        "popularity": 425.007,
        "poster_path": "/p0WBnzgyqxMxbF4UGiqTwBLnwht.jpg",
        "release_date": "2023-08-30",
        "title": "The Equalizer 3",
        "video": false,
        "vote_average": 7,
        "vote_count": 110
    },
    {
        "adult": false,
        "backdrop_path": "/nYDPmxvl0if5vHBBp7pDYGkTFc7.jpg",
        "genre_ids": [
            27
        ],
        "id": 709631,
        "original_language": "en",
        "original_title": "Cobweb",
        "overview": "Eight year old Peter is plagued by a mysterious, constant tapping from inside his bedroom wall—one that his parents insist is all in his imagination. As Peter's fear intensifies, he believes that his parents could be hiding a terrible, dangerous secret and questions their trustworthiness.",
        "popularity": 391.111,
        "poster_path": "/cGXFosYUHYjjdKrOmA0bbjvzhKz.jpg",
        "release_date": "2023-07-19",
        "title": "Cobweb",
        "video": false,
        "vote_average": 6.8,
        "vote_count": 302
    },
    {
        "adult": false,
        "backdrop_path": "/7drO1kYgQ0PnnU87sAnBEphYrSM.jpg",
        "genre_ids": [
            16,
            28,
            27
        ],
        "id": 1083862,
        "original_language": "ja",
        "original_title": "バイオハザード：デスアイランド",
        "overview": "In San Francisco, Jill Valentine is dealing with a zombie outbreak and a new T-Virus, Leon Kennedy is on the trail of a kidnapped DARPA scientist, and Claire Redfield is investigating a monstrous fish that is killing whales in the bay. Joined by Chris Redfield and Rebecca Chambers, they discover the trail of clues from their separate cases all converge on the same location, Alcatraz Island, where a new evil has taken residence and awaits their arrival.",
        "popularity": 364.531,
        "poster_path": "/qayga07ICNDswm0cMJ8P3VwklFZ.jpg",
        "release_date": "2023-06-22",
        "title": "Resident Evil: Death Island",
        "video": false,
        "vote_average": 7.6,
        "vote_count": 642
    }
]
global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        value: "Testing something!"
    })
}));
describe('FilmTest component', () => {
    it("should rendr film component", () => {
        render(<FilmList films={films} loading={false} />)
    })
})