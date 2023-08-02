/**
 * @fileoverview this file contains the interfaces for the project
 */
export interface Option {
  id: number;
  value: string;
}

export interface AutoCompleteProps {
  options: Option[];
}
