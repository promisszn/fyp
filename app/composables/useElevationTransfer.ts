export interface TransferElevation {
  point: string;
  elevation: number;
  chainage: string;
}

export const useElevationTransfer = () => {
  // Use useState to persist the elevations across navigation
  const transferredElevations = useState<TransferElevation[]>('transferredElevations', () => []);

  const setTransferredElevations = (elevations: TransferElevation[]) => {
    transferredElevations.value = elevations;
  };

  const getTransferredElevations = () => {
    return transferredElevations.value;
  };

  const clearTransferredElevations = () => {
    transferredElevations.value = [];
  };

  const hasTransferredElevations = computed(() => {
    return transferredElevations.value.length > 0;
  });

  return {
    transferredElevations: readonly(transferredElevations),
    setTransferredElevations,
    getTransferredElevations,
    clearTransferredElevations,
    hasTransferredElevations
  };
};
