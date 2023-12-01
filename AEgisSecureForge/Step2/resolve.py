SIZE_HEADER = 5

_max_buffer_size = SIZE_HEADER
from enum import Enum

class AESFP_CMDS(Enum):
    PROTOCOL_CMD_REGISTER = (10).to_bytes(1, "little")
    PROTOCOL_CMD_GET_LATEST = (20).to_bytes(1, "little")
    PROTOCOL_CMD_HEALTHCHECK = (99).to_bytes(1, "little")


MAGIC_NUMBER = (1100).to_bytes(2, "little")

def data_received(data: bytes):
    _max_buffer_size = SIZE_HEADER
    datas = data.split(b"\r\n")
    _buffer: bytes = b""
    if not datas:
        print("Echec 1")
        return

    if len(_buffer) < _max_buffer_size:
        _buffer += datas[0]

    if len(_buffer) > SIZE_HEADER:
        print("Echec 2")
        return

    if len(_buffer) == _max_buffer_size:
        pkt_magic_number = _buffer[:2]
        if pkt_magic_number != MAGIC_NUMBER:
            print("Echec 3")
            return

        pkt_cmd = _buffer[2:3]
        if pkt_cmd not in (
            member.value for member in AESFP_CMDS.__members__.values()
        ):
            print("Echec  4")
            return

        cmd_name = AESFP_CMDS(pkt_cmd).name
        pkt_size = int.from_bytes(
            _buffer[3:SIZE_HEADER], byteorder="little"
        )

        _buffer = b""
        _current_cmd = pkt_cmd
        _max_buffer_size = pkt_size
        datas = [datas[1]] if len(datas) > 1 else []

        print(
            f"[COMMAND] Name: {cmd_name} Argument length required: {pkt_size} bytes"
        )

    if len(datas) < 1:
        print('Echec 5')
        return

    print("_current_cmd : ", _current_cmd)
    if _current_cmd:
        if len(_buffer) < _max_buffer_size:
            _buffer += datas[0][
                : max(_max_buffer_size - len(_buffer), 0)
            ]

        print("_max_buffer_size : ", _max_buffer_size)
        if len(_buffer) == _max_buffer_size:
            cmd_name = AESFP_CMDS(_current_cmd).name

            if cmd_name == AESFP_CMDS.PROTOCOL_CMD_REGISTER.name:
                print("Register")
                _handle_registration(_buffer)
            elif cmd_name == AESFP_CMDS.PROTOCOL_CMD_GET_LATEST.name:
                print("GET Latest")
                _handle_get_latest(_buffer)
            elif cmd_name == AESFP_CMDS.PROTOCOL_CMD_HEALTHCHECK.name:
                print("HEALTH CHECK")
                _handle_healthcheck(_buffer)

            print("RESET")
    




def _handle_healthcheck(check: bytes):
    res = b"HEALTH_OK"
    if check == b"\x2a":
        print("Well done")

data = bytes.fromhex("4c046300000d0a")
print("data : ", data)
data_received(data)