export enum BookingStatus {
  // Quando o anfitrião confirma a reserva.
  Confirmed = "CONFIRMED",

  // Quando motorista solicita reserva de um estacionamento.
  Pending = "PENDING",

  // Status para reservas pagas.
  Paid = "PAID",

  // Quando o veiculo é estacionado e o motorista precisa efetuar o pagamento.
  PendingPayment = "PENDING_PAYMENT",

  // Quando o motorista declara que efetuou o pagamento, solicitando a confirmação do anfitrião.
  PendingConfirmPayment = "PENDING_CONFIRM_PAYMENT",

  // Quando a reserva é cancelada.
  Canceled = "CANCELED",
}
