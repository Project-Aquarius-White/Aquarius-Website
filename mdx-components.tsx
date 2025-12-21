import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        // Add custom components here if needed for direct MDX usage
        // e.g. Callout: (props) => <div className="callout" {...props} />
    }
}
