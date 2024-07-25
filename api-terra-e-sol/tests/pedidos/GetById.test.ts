import { describe, it, expect } from "@jest/globals";
import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pedidos - GetById", () => {
  it("Busca registro por id", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "20/07/2024",
      detalhes: "Detalhes do pedido",
    });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/pedidos/${res.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Tenta buscar registro que não existe", async () => {
    const res = await testServer.get("/pedidos/9999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
