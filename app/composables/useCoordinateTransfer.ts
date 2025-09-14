export interface TransferCoordinate {
  point: string;
  easting: number;
  northing: number;
  elevation: number | null;
}

export const useCoordinateTransfer = () => {
  // Use useState to persist the coordinates across navigation
  const transferredCoordinates = useState<TransferCoordinate[]>('transferredCoordinates', () => []);

  const setTransferredCoordinates = (coordinates: TransferCoordinate[]) => {
    transferredCoordinates.value = coordinates;
  };

  const getTransferredCoordinates = () => {
    return transferredCoordinates.value;
  };

  const clearTransferredCoordinates = () => {
    transferredCoordinates.value = [];
  };

  const hasTransferredCoordinates = computed(() => {
    return transferredCoordinates.value.length > 0;
  });

  return {
    transferredCoordinates: readonly(transferredCoordinates),
    setTransferredCoordinates,
    getTransferredCoordinates,
    clearTransferredCoordinates,
    hasTransferredCoordinates
  };
};
