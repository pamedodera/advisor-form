import firmsData from '../../firms.json';

export class FirmService {
  private static firms: string[] = firmsData;

  /**
   * Check if a firm name matches any firm in our database
   * @param firmName - The firm name to validate
   * @returns boolean indicating if the firm is found
   */
  static isValidFirm(firmName: string): boolean {
    if (!firmName || firmName.trim() === '') {
      return false;
    }

    const normalizedInput = firmName.trim().toLowerCase();
    return this.firms.some(firm =>
      firm.toLowerCase() === normalizedInput
    );
  }

  /**
   * Get all firms for autocomplete/suggestions
   * @returns Array of all firm names
   */
  static getAllFirms(): string[] {
    return [...this.firms];
  }

  /**
   * Get firm suggestions based on partial input
   * @param input - Partial firm name
   * @param maxSuggestions - Maximum number of suggestions to return
   * @returns Array of matching firm names
   */
  static getFirmSuggestions(input: string, maxSuggestions: number = 10): string[] {
    if (!input || input.trim() === '') {
      return [];
    }

    const normalizedInput = input.trim().toLowerCase();

    // First, find exact matches at the beginning
    const startsWithMatches = this.firms.filter(firm =>
      firm.toLowerCase().startsWith(normalizedInput)
    );

    // Then, find contains matches
    const containsMatches = this.firms.filter(firm => {
      const firmLower = firm.toLowerCase();
      return firmLower.includes(normalizedInput) && !firmLower.startsWith(normalizedInput);
    });

    // Combine and limit results
    const allMatches = [...startsWithMatches, ...containsMatches];
    return allMatches.slice(0, maxSuggestions);
  }

  /**
   * Find the exact firm name match for display purposes
   * @param firmName - The firm name to find
   * @returns The exact firm name from the database or null if not found
   */
  static getExactFirmName(firmName: string): string | null {
    if (!firmName || firmName.trim() === '') {
      return null;
    }

    const normalizedInput = firmName.trim().toLowerCase();
    const found = this.firms.find(firm =>
      firm.toLowerCase() === normalizedInput
    );

    return found || null;
  }
}