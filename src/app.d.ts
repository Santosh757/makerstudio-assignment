// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface Rating {
	rate: number
	count: number
}

interface Product {
	id: number
	title: string
	image: string
	price: number
	description: string
	category: string
	rating: Rating
}
