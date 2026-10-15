const revealElements = document.querySelectorAll(
	'main > section:not(#proyek), #proyek article, footer'
);
const prefersReducedMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
);

if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			const projectIndex = Array.from(
				entry.target.parentElement.children
			).indexOf(entry.target);
			const delay = entry.target.matches('#proyek article')
				? Math.max(0, projectIndex - 1) * 100
				: 0;

			entry.target.animate(
				[
					{ opacity: 0, transform: 'translateY(24px)' },
					{ opacity: 1, transform: 'translateY(0)' }
				],
				{
					duration: 650,
					delay,
					easing: 'ease-out',
					fill: 'both'
				}
			);
			observer.unobserve(entry.target);
		});
	}, {
		threshold: 0.12
	});

	revealElements.forEach((element) => revealObserver.observe(element));
}
