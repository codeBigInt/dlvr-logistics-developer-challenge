import { useEffect, useState } from 'react'

const useDebounce = (query: string, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(query)
    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
           setDebouncedValue(query)
        }, delay)

    return () => clearTimeout(debounceTimer)
    }, [query])

    return debouncedValue
}

export default useDebounce
