export const SEVERITY = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'information'
}; //ca si o enumerare, un obiect constant
//export cu nume - din acest modul exportam pt cine il va folosi

//export const Issue = (severity, code, details) => {

export function Issue(severity, code, details) {
    this.severity = severity;
    this.code = code;
    this.details = details;
}