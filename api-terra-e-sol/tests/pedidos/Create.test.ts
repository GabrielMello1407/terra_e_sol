import { describe, it, expect } from "@jest/globals";
import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pedidos - Create", () => {
  it("Deve retornar BAD_REQUEST para todos os campos válidos", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "20/07/2024",
      detalhes: "Detalhes do pedido",
    });

    console.log("Response Body:", res.body);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.text).toEqual("Created!");
  });

  it("Deve retornar BAD_REQUEST quando nome está ausente", async () => {
    const res = await testServer.post("/pedidos").send({
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando número é string", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: "abc",
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando telefone está ausente", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando valor é string", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: "cem",
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando data é string inválida", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "20-07-2024",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando data está ausente", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando nome tem menos de 3 caracteres", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Ga",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando detalhes não são fornecidos (opcional)", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando todos os campos são strings", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: "abc",
      telefone: "telefone",
      valor: "valor",
      data: "data",
      detalhes: "detalhes",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o telefone é um número inválido", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "123",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o valor é negativo", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: -150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o número é negativo", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: -1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando data é no passado", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2020-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando nome contém caracteres especiais", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel@#",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o valor é zero", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 0,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o número é zero", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 0,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando a data é no formato incorreto", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024/07/20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o telefone é muito longo", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "3525124935251249352512493525124935251249", // Telefone muito longo
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o número é decimal", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150.5,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o valor é decimal", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150.5,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando detalhes são muito longos", async () => {
    const longDetails = "a".repeat(1001); // Supõe um limite de 1000 caracteres
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: longDetails,
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o nome é nulo", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: null,
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar BAD_REQUEST quando o telefone é um número", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: 123456789, // Número em vez de string
      valor: 150,
      data: "2024-07-20",
      detalhes: "Detalhes do pedido",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
