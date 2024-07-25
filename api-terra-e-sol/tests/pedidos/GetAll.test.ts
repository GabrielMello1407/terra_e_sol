import { describe, it, expect } from "@jest/globals";
import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pedidos - GetAll", () => {
  it("Buscar todos os registros", async () => {
    const res = await testServer.post("/pedidos").send({
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "20/07/2024",
      detalhes: "Detalhes do pedido",
    });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/pedidos").send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
