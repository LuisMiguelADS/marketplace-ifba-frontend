
export const getStatusColor = (status) => {
  switch (status) {
    case 'NAO_APROVADA':
    case 'EXCLUIDA':
      return '#dc3545'; 
    case 'AGUARDANDO_PROPOSTA':
      return '#007bff'; 
    case 'AGUARDANDO_APROVACAO':
      return '#fd7e14';
    case 'FINALIZADA':
      return '#28a745';
    case 'APROVADA':
      return '#28a745';
    case 'INATIVA':
    default:
      return '#6c757d'; 
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 'NAO_APROVADA':
      return 'Não Aprovada';
    case 'EXCLUIDA':
      return 'Excluída';
    case 'AGUARDANDO_PROPOSTA':
      return 'Aguardando Proposta';
    case 'AGUARDANDO_APROVACAO':
      return 'Aguardando Aprovação';
    case 'FINALIZADA':
      return 'Finalizada';
    case 'APROVADA':
      return 'Aprovada';
    case 'INATIVA':
      return 'Inativa';
    default:
      return status;
  }
};