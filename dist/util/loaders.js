import { readdir, stat } from 'node:fs/promises';
import { URL } from 'node:url';
import { predicate as commandPredicate } from '../commands/index.js';
import { predicate as eventPredicate } from '../events/index.js';
/**
 * Loads all the structures in the provided directory
 *
 * @param dir - The directory to load the structures from
 * @param predicate - The predicate to check if the structure is valid
 * @param recursive - Whether to recursively load the structures in the directory
 * @returns
 */
export async function loadStructures(dir, predicate, recursive = true) {
    // Get the stats of the directory
    const statDir = await stat(dir);
    // If the provided directory path is not a directory, throw an error
    if (!statDir.isDirectory()) {
        throw new Error(`The directory '${dir}' is not a directory.`);
    }
    // Get all the files in the directory
    const files = await readdir(dir);
    // Create an empty array to store the structures
    const structures = [];
    // Loop through all the files in the directory
    for (const file of files) {
        // If the file is index.js or the file does not end with .js, skip the file
        if (file === 'index.js' || !file.endsWith('.js')) {
            continue;
        }
        // Get the stats of the file
        const statFile = await stat(new URL(`${dir}/${file}`));
        // If the file is a directory and recursive is true, recursively load the structures in the directory
        if (statFile.isDirectory() && recursive) {
            structures.push(...(await loadStructures(`${dir}/${file}`, predicate, recursive)));
            continue;
        }
        // Import the structure dynamically from the file
        const structure = (await import(`${dir}/${file}`)).default;
        // If the structure is a valid structure, add it
        if (predicate(structure))
            structures.push(structure);
    }
    return structures;
}
export async function loadCommands(dir, recursive = true) {
    return (await loadStructures(dir, commandPredicate, recursive)).reduce((acc, cur) => acc.set(cur.data.name, cur), new Map());
}
export async function loadEvents(dir, recursive = true) {
    return loadStructures(dir, eventPredicate, recursive);
}
//# sourceMappingURL=loaders.js.map